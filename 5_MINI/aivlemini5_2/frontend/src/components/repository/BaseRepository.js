export default class BaseRepository{

    constructor(axios, path){

        this.axios = axios
        this.path = path
    }

    async findById(id){
        try{
             let result = await this.axios.get(this.fixUrl(`/${this.path}/${id}`))
             result.data.id = id;
             return result.data;
         }catch(e){
             return null;
         }
    }

     async afterProcess(data){   //TODO
        if (!Array.isArray(data)) return [];
        let Promises = data.map(async (value) => {
            if(value == null) return
        });
        await Promise.all(Promises);
        for(var i = 0; i < data.length ; i++ ) {
            data[i].index = i;
        }
        return data;

    }

    async find(query) {
     var temp = null;
     if(query!=null){
        let parameter = {
            params: query.parameters
        }
        temp = await this.axios.get(this.fixUrl(`/${query.apiPath}`), parameter);
     }else{
        temp = await this.axios.get(this.fixUrl(`/${this.path}`));
     }

     const embedded = temp.data._embedded ? temp.data._embedded[this.path] : [];
     return await this.afterProcess(embedded || []);
    }


    async save(entity, isNew){
        if(isNew) {
            return await this.axios.post(this.fixUrl(`/${this.path}`), entity)
        } else {
            return await this.axios.put(this.fixUrl(entity._links.self.href), entity)
        }
        
    }

    async delete(entity){
        await this.axios.delete(this.fixUrl(entity._links.self.href))

        return await this.find(null)
    }

    async invoke(entity, link, params) {
        return await this.axios.put(this.fixUrl(entity._links[link].href), params)
    }

    async generate(pathVal) {
        var temp = null;
        temp = await this.axios.get(this.fixUrl(`/${pathVal}`));
        const embedded = temp.data._embedded ? temp.data._embedded[pathVal] : [];
        return await this.afterProcess(embedded || []);
    }

    fixUrl(path) {
        if (!this.axios.defaults.baseURL && path.startsWith('/')) {
            return path;
        }

        let url;

        try {
            url = new URL(path);
        } catch (e) {
            url = new URL(this.axios.defaults.baseURL + path);
        }

        if (!this.axios.defaults.baseURL) {
            return url.pathname;
        }

        url.hostname = new URL(this.axios.defaults.baseURL).hostname;
        url.port = new URL(this.axios.defaults.baseURL).port;

        return url.href;
    }
}