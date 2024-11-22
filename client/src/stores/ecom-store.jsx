import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/Product";
import { loginUser } from "../api/auth";
import _, { isEqual } from "lodash";

const ecomStore = (set, get) => ({
  // key:value
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },

  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    // step uniqe
    const uniq = _.unionWith(updateCart, isEqual); // lodash uniq สำหรับค่าที่ไม่ซ้ำกันเมื่อ เลือก สินค้าใน ตะกร้า

    set({ carts: uniq });
    // console.log("update cart :", updateCart);
    // console.log("uuinq :", uniq);
  },
  //update quantity with cart
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log("updaet click", productId, newQuantity);

    //การ set เพื่อเข้าถึงตะกร้าสินค้า
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    // console.log("remove product", productId);
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  GetTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },

  actionLogin: async (form) => {
    // console.log("action Login");
    const res = await loginUser(form);
    // console.log("test  : " ,res.data.payload);
    // console.log("zustand  :" + res.data.payload);
    set({
      user: res.data.payload,
      token: res.data.token,
    });

    return res;
  },
  //key: value   คือ key คือ getCategory value คือ function
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count);
      set({ products: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionClearCart: () => {
    try {
      set({ carts: [] });
    } catch (error) {
      console.log("Failed to clear cart", error);
    }
  },
});

const userPersist = {
  name: "ecommere-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, userPersist));

//export ไปใช้งาน
export default useEcomStore;
