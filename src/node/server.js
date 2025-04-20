const cors = require('cors')
const express = require('express')
const app = express()
const xml2js = require('xml2js')
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => { 
    const urlXml = 'http://www.cbr.ru/scripts/XML_daily.asp?date_req='
    const getData = async () => {
        const response = await fetch(urlXml)
        const data = await response.text()
          let parser = new xml2js.Parser({
            explicitCharset: 'UTF-8',
            normalize: true,
            trim: true,        
            ignoreAttrs: false,
            mergeAttrs: true
          })
          parser.parseString(data, (err, result) => {
            if (err) {
              console.log('Ошибка')
              return;
            }
            else {
              res.json(result)
            }


         })
    }
    getData()
})

app.post('/week', (req, res) => { 
  const urlXml = 'http://www.cbr.ru/scripts/XML_daily.asp?date_req=' + req.body.data
  console.log(urlXml);
  
  const getData = async () => {
      const response = await fetch(urlXml)
      const data = await response.text()
        let parser = new xml2js.Parser({
          explicitCharset: 'UTF-8',
          normalize: true,
          trim: true,        
          ignoreAttrs: false,
          mergeAttrs: true
        })
        parser.parseString(data, (err, result) => {
          if (err) {
            console.log('Ошибка')
            return;
          }
          else {
            res.json(result)
          }


       })
  }
  getData()
})





app.listen(4000, () => console.log('Сервер node запущен')).on('error', (err) => {
    console.error('Ошибка запуска сервера:', err.message);
});