# TheOffice

To bring up the application setup (Docker) on local:

```shell
docker-compose up
```
> Please make sure that the Docker runtime is setup on your local

The application server is running on port `3000` on `localhost`

Navigate to [http://localhost:3001/](http://localhost:3001/) to view the `swagger documentation` for the APIs

Sample API call (get all employees):

```shell
curl --location --request GET 'localhost:3000/api/employees'
```