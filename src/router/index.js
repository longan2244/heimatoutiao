import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login"
import Layout from "@/views/layout"
import Home from "@/views/home"
import Qa from "@/views/qa"
import Video from "@/views/video"
import My from "@/views/my"
import Search from "@/views/search"
import Articleinfo from "@/views/articleinfo"
import EditTheProfile from "@/views/editTheProfile/index"
import Robot from "@/views/my/Robot/index.vue"

Vue.use(VueRouter)

const routes = [
  { path: "/login", name: "login", component: Login },
  {
    path: "/", name: "layout", component: Layout,
    redirect: "/home",
    children: [
      { path: "home", name: "home", component: Home },
      { path: "qa", name: "qa", component: Qa },
      { path: "video", name: "video", component: Video },
      { path: "my", name: "my", component: My },
    ]
  },
  { path: "/seach", name: "seach", component: Search },
  { path: "/article/:article_id", name: "article", component: Articleinfo, props: true },
  { path: "/my/editTheProfile", name: "editTheProfile", component: EditTheProfile },
  { path: "/my/robot", name: "robot", component: Robot }

]

const router = new VueRouter({
  routes
})

export default router
