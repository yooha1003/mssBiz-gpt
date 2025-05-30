const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// 기본 라우트
app.get('/msit', async (req, res) => {
    const serviceKey = req.query.serviceKey;
    const pageNo = req.query.pageNo || 1;
    const numOfRows = req.query.numOfRows || 10;

    if (!serviceKey) {
        return res.status(400).json({ error: 'serviceKey is required' });
    }

    try {
        // 공공데이터포털 API 호출
        const apiUrl = `https://apis.data.go.kr/1421000/mssBizService_v2/getMssBizList?serviceKey=${encodeURIComponent(serviceKey)}&pageNo=${pageNo}&numOfRows=${numOfRows}`;

        const response = await axios.get(apiUrl);
        
        // 응답 결과 클라이언트에 전송
        res.json(response.data);
    } catch (error) {
        console.error('API 요청 실패:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from MSS API' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버 실행 중: https://apis.data.go.kr/1421000/mssBizService_v2/getbizList_v2?serviceKey=Hk%252FN%252BBOSJC66biuLuC5Xa9aZV5PLx0peXy2H7GvdsTLr3EvwE%252BkQIqnggSASFMO3TARrxwPH%252Br6qdRS0ngd0WQ%253D%253D&pageNo=10&numOfRows=10
`);
});

