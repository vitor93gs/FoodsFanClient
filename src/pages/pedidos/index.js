import Head from "next/head";

import { useState } from "react";

import { IoIosArrowDropright } from "react-icons/io";
import { BsFillChatLeftTextFill } from "react-icons/bs";

import { NavBar } from "../../components/NavBar";
import { BackgroundBanner } from "../../components/BackgroundBanner";
import AddButton from "../../components/AddButton";

import { ProtectedRoute } from "../../middlewares/protectedRoute";

import styles from "./styles.module.css";

import React from "react";

function Page() {
  const [modalItem, setModalIten] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  function handleModalOpenView() {
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  Modal.setAppElement("#__next");

  return (
    <div className="flex">
      <Head>
        <title>FoodsFun - Pedidos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="w-60"></div>
      <NavBar />

      <div className={styles.screen}>
        <BackgroundBanner />

        <div className="w-full mt-11 px-5 rounded-2xl flex justify-between items-center">
          <AddButton />
        </div>
        <div className="mt-11 mx-4 h-48 border-2 rounded-2xl bg-white ">
          <div className="space-y-0  h-16 bg-themeOrange text-white text-[1.3rem] py-2 px-2 rounded-t-lg">
            <div className="flex justify-around mt-2 bg-transparent">
              <div className="w-1/8 bg-transparent">Pedido</div>
              <div className="w-1/8 bg-transparent flex">
                Mesa
                <button>
                  <IoIosArrowDropright
                    size={25}
                    color="#fff"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "2px",
                    }}
                  />
                </button>
              </div>

              <div className="w-1/8 bg-transparent">Quantidade</div>
              <div className="w-4/8 bg-transparent">Produto</div>
              <div className="w-1/8 bg-transparent flex">
                Status
                <button type="button">
                  <IoIosArrowDropright
                    size={25}
                    color="#fff"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "2px",
                    }}
                  />
                </button>
              </div>
            </div>
            {/* as proximas divs serao geradas automaticamente */}
          </div>

          <div className="flex mt-5 px-2 bg-white">
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-white border ">002</span>
            </div>
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-white border ">22</span>
            </div>
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-white border ">05</span>
            </div>
            <div className="w-4/8 bg-white flex">
              <span className="rounded-2xl bg-white ">Hamburguer</span>

              <button type="button" onClick={handleModalOpenView}>
                <BsFillChatLeftTextFill
                  size={16}
                  color="#AAA"
                  style={{ backgroundColor: "transparent", marginLeft: "10px" }}
                />
              </button>
            </div>
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-green-400 border border-green-400">
                Concluido
              </span>
            </div>
          </div>

          <div className="flex mt-8 px-2 bg-white">
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-white border ">002</span>
            </div>
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-white border ">22</span>
            </div>
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-white border ">05</span>
            </div>
            <div className="w-4/8 bg-white flex">
              <span className="rounded-2xl bg-white ">Hamburguer</span>

              <button type="button">
                <BsFillChatLeftTextFill
                  size={16}
                  color="#AAA"
                  style={{ backgroundColor: "transparent", marginLeft: "10px" }}
                />
              </button>
            </div>
            <div className="w-1/8 bg-white">
              <span className="p-2 rounded-2xl bg-yellow-200 border border-yellow-200">
                Preparando
              </span>
            </div>
          </div>
        </div>
      </div>

      {modalVisible && <ModalPedidos />}
    </div>
  );
}

export default function Pedidos() {
  return <ProtectedRoute component={Page} />;
}
