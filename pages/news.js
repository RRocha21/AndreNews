import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import xml2js from 'xml2js'

const url = 'https://pt.ign.com/news.xml'
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';

export default function Home() {
  const [news, setNews] = useState([]);
  

useEffect(() => {
  fetch(proxyUrl + url)
  .then(response => response.text())
  .then(xml => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const items = result.rss.channel[0].item.slice(0,15);
        const data = items.map(item => ({
          title: item.title[0],
          enclosure: item.enclosure[0].$.url
        }));
        console.log(data);
        setNews(data);
      }
    })
  })
  .catch(error => console.log(error));
}, []);

  return (
    <div>
      <h1>Latest IGN Portugal News</h1>
      {news.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          {item.enclosure && <img src={item.enclosure} alt={item.title} />}
        </div>
      ))}
    </div>
  );
}
