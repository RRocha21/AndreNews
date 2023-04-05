import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import xml2js from 'xml2js'

const url = 'https://pt.ign.com/news.xml';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';


export default function Home() {
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);

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
              enclosure: item.enclosure[0].$.url,
              left: 1506,
              opacity: 1
            }));
            console.log(data);
            setNews(data);
          }
        })
      })
      .catch(error => console.log(error));
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      
      setCount(count => count + 1);

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
            news[i].left = 402;
            news[i].opacity = 1;
          } else if (i == count + 2) {
            news[i].left = 804;
            news[i].opacity = 1;
          } else if (i == count - 1) {
            news[i].left = -502;
            news[i].opacity = 1;
          } else if (i < count){
            news[i].left = 1506;
            news[i].opacity = 0;
          } else if (i > count){
            news[i].left = 1506;
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
            news[i].left = 402;
            news[i].opacity = 1;
          } else if (i == 0) {
            news[i].left = 804;
            news[i].opacity = 1;
          } else if (i == count - 1) {
            news[i].left = -502;
            news[i].opacity = 1;
          } else if (i < count){
            news[i].left = 1506;
            news[i].opacity = 0;
          } else if (i > count){
            news[i].left = 1506;
            news[i].opacity = 0;
          }
        } else if (count < news.length) {
          if (i == count) {
            news[i].left = 0;
            news[i].opacity = 1;
          } else if (i == 0) {
            news[i].left = 402;
            news[i].opacity = 1;
          } else if (i == 1) {
            news[i].left = 804;
            news[i].opacity = 1;
          } else if (i == count - 1) {
            news[i].left = -502;
            news[i].opacity = 1;
          } else if (i < count){
            news[i].left = 1506;
            news[i].opacity = 0;
          } else if (i > count){
            news[i].left = 1506;
            news[i].opacity = 0;
          }
        } 
      }
      
    }, 2500);
    return () => clearInterval(interval);
  });

  return (
    <div key = "2">
      <div style={{position: "absolute", left: "250px", top:  "720px", width: "1420px", height: "360px", zIndex: "450", overflow: "hidden", background: "rgb(255,0,0)"}} key = "23">
        <div style={{position: "absolute", left: "107px", top:  "0px", width: "1206px", height: "360px", zIndex: "450"}} key = "24">
        {news.map((property) => (
          <div style={{position: "absolute", left: property.left + "px", top:  "80px", width: "352px", height: "240px", zIndex: "450", opacity: property.opacity, transition: "left 2s, right 2s"}} key = "26">
            <span style={{position:"absolute", textAlign: "center", width: "332px", left: "10px", top: "-55px"}}>{property.title}</span>
            <img src={property.enclosure} style={{ width: "352px", height: "240px", borderRadius: "20px"}} key = "5"/>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
