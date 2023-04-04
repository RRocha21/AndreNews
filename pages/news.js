import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import xml2js from 'xml2js'

const url = 'https://pt.ign.com/news.xml';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';


export default function Home() {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
              enclosure: item.enclosure[0].$.url
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
      changeNews();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const changeNews = () => {
    setCurrentIndex(currentIndex === news.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div>
      <h1>Latest IGN Portugal News</h1>
      <div style={{ display: 'flex' }}>
        {news.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <div key={index} style={{ width: '33.33%', padding: '0 16px' }}>
            <Image src={item?.enclosure} width={256} height={144} />
            <h2 width>{item?.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
