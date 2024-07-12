const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

// javascriptを公開してhtmlからロードできるようにする
app.use(express.static(path.join(__dirname, 'public')));

// 静的なHTMLファイルを提供するルートを設定
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
