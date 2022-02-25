import type { RouteRecordNormalized } from 'vue-router'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

export interface Frontmatter {
  title: string
  date: string
  description: string
  tag: string
  author: string
  published: boolean
  head_image: string
}
export interface Route extends RouteRecordNormalized {
  meta: {
    frontmatter: Frontmatter
  }
}

export const initBlog = (): Route[] => {
  const router = useRouter()
  const blogs = router.getRoutes().reduce((acc, route) => {
    if (route.meta.frontmatter && route.path.startsWith('/blog/'))
      acc.push(route as Route)
    return acc
  }, [] as Route[])
  return blogs
}

export const randomBlog = (path: string): Route => {
  const blogs = initBlog()
  const filtered = blogs.filter(blog => blog.path !== path)
  const blog = filtered[Math.floor(Math.random() * filtered.length)]
  return blog
}

export const stringToDate = (date: string) => {
  return dayjs(date).format('MMMM DD, YYYY')
}
