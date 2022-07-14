import Head from "next/head";

import { NavBar } from "../../components/NavBar";
import { DropDown } from "../../components/Dropdown";
import { BackgroundBanner } from "../../components/BackgroundBanner";
import Card from "../../components/Card";
import AddButton from "../../components/AddButton";
import { ProtectedRoute } from "../../middlewares/protectedRoute";
import categoryStore from "../../store/categoryStore";
import { api } from "../../api";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

function Page() {
// criação do estado da lista de produtos, é definida como estado inicial data[0].title = "" para não dar erro de primeiro render no return
  
  const [products, setProducts] = useState({ data: [{ title: "" }] });


// busca a categoria selecionada no store do zustand

  const selectedCategory = categoryStore((state) => state.selected);

  // função pega o array de produtos ligados à categoria selecionada
  
  async function getProducts() {
    selectedCategory !== ""
      ? setProducts(await api.get(`/getProducts/${selectedCategory}`))
      : null;
  }

  // renderiza a página toda vez que a categoria selecionada é atualizada no zustand

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  return (
    <div className="flex">
      <Head>
        <title>FoodsFun - Produtos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="w-60">
        <NavBar />
      </div>

      <div className={styles.screen}>
        <BackgroundBanner />

        <div className="w-full rounded-2xl flex justify-between items-center">
          <div className="h-24 mt-5 px-5 flex w-full justify-between items-center">
            <DropDown />
            <AddButton />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5  w-full place-items-center mt-14">
          {products.data[0]
            ? products.data.map((cur, key) => {
                return (
                  <Card
                    title={cur.title}
                    category={selectedCategory}
                    key={key}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
export default function Produtos() {
  return <ProtectedRoute component={Page} />;
}
