
import Link from "next/link";
import { getHomePage, getPosts } from "@/lib/api/home";
import { useHomePage } from "@/hooks/useHomePage";
import type { HeroTypes } from "@/types/wordpress";
import Image from "next/image";





export default async function BlogSection() {
  const homeData = await getHomePage()

    const {
    blog_title,
    blog_link } = (homeData.acf ?? {}) as unknown as HeroTypes;


  console.log(blog_link)
  
  const posts = await getPosts({ perPage: 3 });
  return (
    <section className="tips-inspiration mb-130">
      <div className="wrapper">
        <div className="top-part">
          <div className="title">
            {blog_title && <h2 className="animated-title">{blog_title}</h2>}
          </div>

          <div className="btn-group">
                 <Link href={blog_link?.url} className="btn_one trp" target={blog_link?.target ? blog_link?.target: "_self"}>
             {blog_link?.title}
              <span className="arrow">
                <svg
                  width={21}
                  height={21}
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="arrow-fill"
                    d="M0.898589 19.5366L19.5366 0.898561M19.5366 10.2176V0.898561H10.2176"
                    stroke="#1A5C38"
                    strokeWidth="1.79715"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
       
          </div>
        </div>

        <div className="inner-part">
          {posts.map((post) => (
            <article className="card" key={post.id}>
              <div className="img-box">
                {post.image && (
                  <img
                    src={post.image.cropped_url || post.image.url}
                    alt={post.image.alt || post.title}
                  />
                )}
              </div>

              <div className="text-box">
                <div className="category">
                  {post.categories.map((category) => (
                    <span className="cat" key={category.id}>
                      {category.name}
                    </span>
                  ))}
                </div>

                <h3>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <div className="user">
                  <div className="profile-img">
                    {post.author.image && (
                      <img
                        src={post.author.image}
                        alt={post.author.name || "Author"}
                        width={40}
                        height={40}
                      />
                    )}
                  </div>

                  <span className="user-name">{post.author.name}</span>

                  <span className="date">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
