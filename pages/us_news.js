import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import xml2js from 'xml2js'

const url = 'https://feeds.feedburner.com/ign/news';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';


export default function Home() {
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(-1);
  const [newData, setNewData] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch(proxyUrl + url)
      .then(response => response.text())
      .then(xml => {
        xml2js.parseString(xml, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            const items = result.rss.channel[0].item.slice(0, 15);
            const data = items.map(item => ({
              title: item.title[0],
              enclosure: item['media:content'][0].$.url,
              left: 1322,
              opacity: 1,
              pubDate: new Date(item.pubDate[0]).getTime()
            }));

            console.log(data)
            data[0].left = 0;
            data[1].left = 411;
            data[2].left = 822;
            data[data.length - 1].left = -502;

            setNews(data);
          }
        })
      })
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      
      setCount(count => count + 1);

      if (index === -1) {
        fetch(proxyUrl + url)
        .then(response => response.text())
        .then(xml => {
          xml2js.parseString(xml, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              const items = result.rss.channel[0].item.slice(0, 15);

              const data = items.map(item => ({
                title: item.title[0],
                enclosure: item['media:content'][0].$.url,
                left: 1322,
                opacity: 1,
                pubDate: new Date(item.pubDate[0]).getTime()
              }));
              // console.log(data);
  
              const missingItems = news.reduce((acc, curr, index) => {
                if (!data.some(dataItem => dataItem.title === curr.title)) {
                  acc = index;
                }
                return acc;
              }, []);
              if (missingItems !== undefined && missingItems.length !== 0) {
                setIndex(missingItems);
                setNewData(data);
              } else {
                setIndex(-1);
                setNewData([]);
              }
            }
          })
        })
      }

      if ((count > 2 && count < news.length - 3 && count !== index && count + 1 !== index && count + 2 !== index && count - 1 !== index) && index !== -1) {
        news[index] = newData[0];
        setIndex(-1);
        setNewData([]);
        setNews(news);
      }

      if (count == news.length - 1) {
        setCount(0);
      }


      for (let i = 0; i < news.length; i++) {
        // if (side !== "left") {
        if (count < news.length - 2) {
          if (i == count) {
            news[i].left = 0;
            news[i].opacity = 1;
          } else if (i == count + 1) {
            news[i].left = 411;
            news[i].opacity = 1;
          } else if (i == count + 2) {
            news[i].left = 822;
            news[i].opacity = 1;
          } else if (i == count - 1) {
            news[i].left = -500;
            news[i].opacity = 1;
          } else if (i < count){
            news[i].left = 1322;
            news[i].opacity = 0;
          } else if (i > count){
            news[i].left = 1322;
            news[i].opacity = 0;
          }

          if(count == 0 && i == news.length - 1) {
            news[i].left = -502;
            news[i].opacity = 1;
          }
        
        } else if (count < news.length - 1) {
          if (i == count) {
            news[i].left = 0;
            news[i].opacity = 1;
          } else if (i == count + 1) {
            news[i].left = 411;
            news[i].opacity = 1;
          } else if (i == 0) {
            news[i].left = 822;
            news[i].opacity = 1;
          } else if (i == count - 1) {
            news[i].left = -500;
            news[i].opacity = 1;
          } else if (i < count){
            news[i].left = 1322;
            news[i].opacity = 0;
          } else if (i > count){
            news[i].left = 1322;
            news[i].opacity = 0;
          }
        } else if (count < news.length) {
          if (i == count) {
            news[i].left = 0;
            news[i].opacity = 1;
          } else if (i == 0) {
            news[i].left = 411;
            news[i].opacity = 1;
          } else if (i == 1) {
            news[i].left = 822;
            news[i].opacity = 1;
          } else if (i == count - 1) {
            news[i].left = -500;
            news[i].opacity = 1;
          } else if (i < count){
            news[i].left = 1322;
            news[i].opacity = 0;
          } else if (i > count){
            news[i].left = 1322;
            news[i].opacity = 0;
          }
        } 
      }
      const newDate = new Date().getTime();
      setDate(newDate);
    }, 10000);
    return () => clearInterval(interval);
  });
  return (
    <div key = "2">
      <div style={{position: "absolute", left: "426px", top:  "915px", width: "1430px", height: "120px", zIndex: "450", overflow: "hidden"}} key = "23">
        <div style={{position: "absolute", left: "136px", top:  "0px", width: "1158px", height: "120px", zIndex: "450"}} key = "24">
        {news.map((property, index) => (
          <div style={{position: "absolute", left: property.left + "px", top:  "0px", width: "336px", height: "120px", zIndex: "450", opacity: property.opacity, transition: "left 2.5s, right 2.5s", overflow: "hidden"}} key = {`news-${index}`}>
            <div style = {{position: "absolute",zIndex: "452" , left: "0px", bottom: "0px", width: "336px", background: "linear-gradient(to top, rgb(0,0,0,0.8) -20%, rgb(0,0,0,0.8) 10%, rgb(0,0,0,0.6) 85%, rgb(0,0,0,0) 100%)", textAlign: "center", padding: "3px 3px 3px"}}>
              <span style = {{fontFamily: "Open Sans", fontWeight: "500"}}>{property.title}</span>
            </div>
            <img src={property.enclosure} style={{position:"absolute", top:"-34px", width: "336px", height: "189px", zIndex: "451" }}/>
            {((new Date().getTime() - new Date(property.pubDate).getTime()) < 3600000) && (
              <span style={{position:"absolute", textAlign: "center", width: "50px",height: "25px", left: "5px", top: "5px", backgroundColor: "rgb(255,215,0", fontWeight: "bold", fontSize: "18px", color: "rgb(0,0,0)"}}>Novo</span>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
