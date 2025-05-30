const express = require("express");
const request = require("request");
const app = express();

app.get("/biz", function (req, res) {
    const { serviceKey, pageNo, numOfRows, startDate, endDate } = req.query;

    const api_url = "https://apis.data.go.kr/1421000/mssBizService_v2/getbizList_v2";
    const options = {
        url: api_url,
        qs: {
            serviceKey: serviceKey,
            pageNo: pageNo || 1,
            numOfRows: numOfRows || 10,
            startDate: startDate,
            endDate: endDate
        },
        headers: { "Accept": "*/*" }
    };

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
            res.end(body);
        } else {
            console.error("API 요청 오류:", response.statusCode);
            res.status(response.statusCode).end();
        }
    });
});

app.listen(3000, function () {
    console.log("서버 실행 중: http://127.0.0.1:3000/biz?serviceKey=Hk%2FN%2BBOSJC66biuLuC5Xa9aZV5PLx0peXy2H7GvdsTLr3EvwE%2BkQIqnggSASFMO3TARrxwPH%2Br6qdRS0ngd0WQ%3D%3D&pageNo=1&numOfRows=10&startDate=20250110&endDate=20250519");
});