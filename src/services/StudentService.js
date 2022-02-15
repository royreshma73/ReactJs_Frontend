import http from "../http-common";


    const getAll = () =>
    {
        return http.get("/allStudents");
    }

    const create = (data) =>
    {
        try
        {
        return http.post("/addStudent", data);
        }
        catch(Exception)
        {
            alert("Network Error");
        }
    }

    export default {
        getAll,create
    };


