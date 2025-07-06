SERVICES=("gateway" "aiservice" "authorservice" "pointservice" "libraryservice" "readservice" "userservice" "scriptservice")

for service in "${SERVICES[@]}"; do
  (
    cd "$service" || exit 1
    nohup mvn spring-boot:run &
  )
done