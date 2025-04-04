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

  // Fetch initial news on mount
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
              left: 1620,
              opacity: 1,
              pubDate: new Date(item.pubDate[0]).getTime()
            }));

            // Initial position setup
            data[0].left = 0;
            data[1].left = 346;
            data[2].left = 692;
            data[3].left = 1038;
            data[data.length - 1].left = -492;
            data[data.length - 1].opacity = 0;

            setNews(data);
          }
        });
      })
      .catch(error => console.log(error));
  }, []);

  // Carousel auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        let nextCount = prev + 1;
        if (nextCount >= news.length) nextCount = 0;
      
        const updatedNews = news.map(item => ({
          ...item,
          left: 1620,
          opacity: 0
        }));
      
        const visibleItems = 4;
        const positions = [0, 346, 692, 1038];
      
        for (let i = 0; i < visibleItems; i++) {
          const idx = (nextCount + i) % updatedNews.length;
          updatedNews[idx].left = positions[i];
          updatedNews[idx].opacity = 1;
        }
      
        // Add previous slide to the left for entry animation
        const prevIndex = (nextCount - 1 + updatedNews.length) % updatedNews.length;
        updatedNews[prevIndex].left = -492;
        updatedNews[prevIndex].opacity = 0;
        
        setNews(updatedNews);
        setDate(new Date());
      
        return nextCount;
      });
      

      // Check for updates if index is free
      if (index === -1) {
        fetch(proxyUrl + url)
          .then(res => res.text())
          .then(xml => {
            xml2js.parseString(xml, (err, result) => {
              if (err) return console.error(err);
              const items = result.rss.channel[0].item.slice(0, 15);
              const data = items.map(item => ({
                title: item.title[0],
                enclosure: item['media:content'][0].$.url,
                left: 1620,
                opacity: 1,
                pubDate: new Date(item.pubDate[0]).getTime()
              }));

              const missingIndex = news.findIndex(
                oldItem => !data.some(newItem => newItem.title === oldItem.title)
              );

              if (missingIndex !== -1) {
                setIndex(missingIndex);
                setNewData(data);
              }
            });
          });
      }

      // Replace outdated item if it’s outside the visible range
      if (
        index !== -1 &&
        count !== index &&
        count + 1 !== index &&
        count + 2 !== index &&
        count - 1 !== index
      ) {
        const updated = [...news];
        updated[index] = newData[0];
        setNews(updated);
        setIndex(-1);
        setNewData([]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [news, count, index, newData]);

  return (
    <div key="2">
      <div style={{
        position: "absolute",
        left: "383px",
        top: "915px",
        width: "1516px",
        height: "120px",
        zIndex: "450",
        overflow: "hidden"
      }} key="23">
        <div style={{
          position: "absolute",
          left: "79px",
          top: "0px",
          width: "1358px",
          height: "120px",
          zIndex: "450"
        }} key="24">
          {news.map((property, index) => (
            <div
              key={`news-${index}`}
              style={{
                position: "absolute",
                left: property.left + "px",
                top: "0px",
                width: "320px",
                height: "120px",
                zIndex: "450",
                opacity: property.opacity,
                transition: "left 2.5s, opacity 2.5s",
                overflow: "hidden"
              }}
            >
              <div style={{
                position: "absolute",
                zIndex: "452",
                left: "0px",
                bottom: "0px",
                width: "320px",
                background: "linear-gradient(to top, rgba(0,0,0,0.8) -20%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0) 100%)",
                textAlign: "center",
                padding: "3px"
              }}>
                <span style={{
                  fontFamily: "Open Sans",
                  fontWeight: "500"
                }}>{property.title}</span>
              </div>
              <img
                src={property.enclosure}
                style={{
                  position: "absolute",
                  top: "-34px",
                  left: "-8px",
                  width: "336px",
                  height: "189px",
                  zIndex: "451"
                }}
              />
              {(new Date().getTime() - new Date(property.pubDate).getTime() < 3600000) && (
                <span style={{
                  position: "absolute",
                  textAlign: "center",
                  width: "50px",
                  height: "25px",
                  left: "5px",
                  top: "5px",
                  backgroundColor: "rgb(255,215,0)",
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "rgb(0,0,0)"
                }}>Novo</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}