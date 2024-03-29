import styles from "./styles.module.css";

import Head from "next/head";

import { useEffect, useState } from 'react';
import { toast } from "react-toastify"

import { FaRegTrashAlt } from "react-icons/fa"

import { ProtectedRoute } from "../../middlewares/protectedRoute";

import categoryStore from "../../store/categoryStore";
import reloadStore from "../../store/reloadStore";

import { api } from "../../api";

import NavBar from "../../components/NavBar";
import { DropDown } from "../../components/Dropdown";
import { BackgroundBanner } from "../../components/BackgroundBanner";
import Card from "../../components/Card";
import AddButton from "../../components/AddButton";
import ModalDelete from "../../components/ModalDelete";

function Page() {
  // criação do estado da lista de produtos, é definida como estado inicial data[0].title = "" para não dar erro de primeiro render no return

  const [products, setProducts] = useState({});

  // busca a categoria selecionada no store do zustand

  const setCategory = categoryStore((state) => state.changeList);
  const category = categoryStore((state) => state.list);
  const selectedCategory = categoryStore((state) => state.selectedCategory);
  const categoryId = categoryStore((state) => state.selectedId);
  const reloadState = reloadStore((state) => state.reload);
  const setReload = reloadStore((state) => state.setReload);

  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function closeDeleteModal() {
    setDeleteOpen(false);
  }
  function openDeleteModal() {
    setDeleteOpen(true);
  }

  // função pega o array de produtos ligados à categoria selecionada

  async function getProducts() {
    selectedCategory !== null
      ? setProducts(await api.get(`/getProducts/${selectedCategory}`))
      : setProducts({});
  }

  // renderiza a página toda vez que a categoria selecionada é atualizada no zustand

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  useEffect(() => {
    getProducts();
    setReload(false);
  }, [reloadState]);

  async function handleDelete() {
    category.length === 1 ? setCategory(null) : null;
    setLoading(true);
    try {
      const body = { categoryId };
      await api.delete("/deleteCategory", { data: body });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setReload(true);
    closeDeleteModal();
    toast.success("Categoria deletada com sucesso!", {
			position: toast.POSITION.TOP_CENTER,
		  });
  }

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
            <div className="flex items-center space-x-2">
              <DropDown />
              {selectedCategory ? (
                <button onClick={openDeleteModal} disabled={loading}>
                  <FaRegTrashAlt size={25} color="#ff0000" />
                </button>
              ) : null}
            </div>
            {selectedCategory ? <AddButton /> : null}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5  w-full place-items-center mt-14">
          {products.data
            ? products.data.map((cur, key) => {
                return (
                  <Card
                    product={cur}
                    title={cur.title}
                    category={selectedCategory}
                    key={key}
                    price={cur.price}
                    id={cur.id}
                    image={cur.image}
                  />
                );
              })
            : null}
        </div>
      </div>
      <ModalDelete
        isOpen={deleteOpen}
        loading={loading}
        closeModal={closeDeleteModal}
        text="deletar essa categoria"
        function={handleDelete}
      />
    </div>
  );
}
export default function Produtos() {
  return <ProtectedRoute component={Page} />;
}
