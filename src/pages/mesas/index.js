import Head from "next/head";

import { NavBar } from "../../components/NavBar";
import { BackgroundBanner } from "../../components/BackgroundBanner";
import AddTable from "../../components/AddTable";
import CardMesas from "../../components/CardMesas";

import styles from "./styles.module.css";

export default function page() {
 return (
   <div className="flex">

      <Head>
        <title>FoodsFun - Mesas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

    <div className="w-60"></div>
    <NavBar/>

    <div className={styles.screen}>
      <BackgroundBanner/>
           
      <div className="h-24 mt-5 px-5 flex justify-end">
        <AddTable/>
      </div>

      <div className="grid  md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5  w-full place-items-center mt-14">
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
        <CardMesas/>
      </div>

    </div>
   </div>
 );
}   