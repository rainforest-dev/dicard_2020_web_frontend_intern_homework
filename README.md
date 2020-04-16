## 2020 Dcard Web Frontend Intern Homework - 鄭羽霖
* Demo: https://r08521610.github.io/dicard_2020_web_frontend_intern_homework/#/f
* 執行: 先 `yarn install` or `npm install` 安裝 packages，再 `yarn start` or `npm start` 執行，倘若瀏覽器未打開可到 [http://localhost:3000](http://localhost:3000) 查看執行結果。

### 架構設計
1. `/f`: 顯示文章列表。
    * 點擊文章會以 Modal 形式打開貼文，並且路由會改變。點擊預覽器以外的區塊關閉預覽器。
    * 滑到底部會自動載入之後的貼文。
    * 列表包含標題 title、摘要 excerpt。
  
2. `/f/:forumAlias/p/:id`: 顯示特定文章。
    * 包含標題 title、內容 content、文章類別 forumName、發布時間 createdAt。
    * 內容中圖片連結能正常顯示、普通連結則可點擊開啟連結。
    
List View | Post in Modal | Post View
:--------:|:-------------:|:---------:
![List View](images/home.png?raw=true "List View") | ![Post in Modal](images/post_in_modal.png?raw=true "Post in Modal") | ![Post View](images/post.png?raw=true "Post View")
    
    
### 技術細節
1. 串結 Api: 使用 React Hooks，透過更新 `lastPostId` 更新文章列表。
    ```javascript
      export const usePosts = (lastPostId) => {
      const [posts, setPosts] = useState([]);

      useEffect(() => {
        const query = lastPostId ? `&before=${lastPostId}` : '';
        Axios.get(
          `https://.../posts?popular=true${query}`
        ).then((res) => {
          setPosts(prevPosts => [...prevPosts, ...res.data]);
        }).catch((error) => console.log(error));
      }, [lastPostId]);

      return posts;
    }
    ```
2. 元件化: 增加程式碼易讀性、元件複用性。
    * List
        ```javascript
          <List 
            items={}
            itemBuilder={() => {}}
            fetchMore={}
          />
        ```
    * DcardListTile
        ```javascript
          <DcardListTile
            key={}
            post={}
            onClick={() => {}}
          />
        ```
3. 路由
    ```javascript
      <Modal />
      
      // 判斷轉址前位置，判斷是否以 Modal 形式呈現
      <Switch location={isModal || location}>
        <Route path="/f/:forumAlias/p/:id">
          // 單篇貼文頁面
        </Route>
        <Route exact path="/f">
          // 貼文列表
        </Route>
        <Route path="/">
          <Redirect to="/f" />
        </Route>
      </Switch>
    ```

### Others
#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn deploy`
Setup `"homepage": "https://<your github id>.github.io/<repo name>",` in your `package.json`, then run this script that could deploy the website to your gh-pages.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
