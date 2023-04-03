import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import xml2js from 'xml2js'

const url = 'https://pt.ign.com/news.xml';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const NewsItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px;
  border-radius: 20px;
  overflow: hidden;
  width: 256px;
  height: 144px;
`

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
      <NewsWrapper>
        {news.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <NewsItem key={index}>
            <ImageWrapper>
              {item.enclosure && <Image src={item.enclosure} alt={item.title} width={256} height={144} objectFit="cover" layout="fixed" />}
              <h2>{item.title}</h2>
            </ImageWrapper>
          </NewsItem>
        ))}
      </NewsWrapper>
    </div>
  );
}

