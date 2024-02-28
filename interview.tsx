const getData = async (url: string): Promise<Article[] | void> => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    let nextPage;

    if (data.metadata.hasOwnProperty("nextPage")) {
      nextPage = data.metadata.nextPage;
    }

    if (nextPage) {
      data = data.articles.concat(await getData(nextPage));
    } else {
      data = data.articles;
    }

    return data;
  } catch (err) {
    return console.error(err);
  }
};

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  likes: number;
  comments?: string[];
}

getData("http://interview-api.jazeee.com/data/articles/page-1.json").then(
  (data) => {
    if (!data) return;

    const sortedArticles = data.sort((a: Article, b: Article) => {
      const aComments = a?.comments ? a.comments.length : 0;
      const bComments = b?.comments ? b.comments.length : 0;
      const aInterest = a.likes + aComments;
      const bInterest = b.likes + bComments;
      // console.log(aComments, bInterest)

      return bInterest - aInterest;
    });

    console.log(`Title 1: ${sortedArticles[0].title}`);
    console.log(`Title 2: ${sortedArticles[1].title}`);
    console.log(`Title 3: ${sortedArticles[2].title}`);
  }
);
