import BaseRepository from './BaseRepository';

export default class BookRepository extends BaseRepository {
  async find(query) {
    let temp = null;
    if (query && query.parameters && Object.keys(query.parameters).length > 0) {
      const params = {};
      Object.entries(query.parameters).forEach(([k, v]) => {
        if (
          v !== undefined &&
          v !== null &&
          (v !== '' || k === 'page' || k === 'size' || k === 'sort')
        ) {
          params[k] = v;
        }
      });
      console.log('GET /books with params:', params);
      temp = await this.axios.get(this.fixUrl(`/${this.path}`), { params });
    } else {
      console.log('GET /books without params');
      temp = await this.axios.get(this.fixUrl(`/${this.path}`));
    }

    let arr = Array.isArray(temp.data)
      ? temp.data
      : (temp.data._embedded ? temp.data._embedded[this.path] || [] : []);
    return await this.afterProcess(arr || []);
  }
}
