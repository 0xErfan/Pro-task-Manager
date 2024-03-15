import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { padStarter } from '../utils';

export default function Slide({ start, stop, value: string, fn }) {

    let swiperItems = []

    if (string) {
        for (let value = 0; value <= string.length - 1; value++) { swiperItems.push(<SwiperSlide key={value} className='flex items-center justify-center'>{string[value]}</SwiperSlide>) }
    } else { for (let value = start; value <= stop; value++) { swiperItems.push(<SwiperSlide key={value} className='flex items-center justify-center'>{padStarter(value)}</SwiperSlide>) } }

    return <Swiper onSlideChange={data => fn(string ? string[data.activeIndex] : data.activeIndex + 1)} direction={'vertical'} className="mySwiper">{swiperItems}</Swiper>
}