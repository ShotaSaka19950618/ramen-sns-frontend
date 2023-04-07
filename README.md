# ramen-sns
 食べたラーメンを投稿するサイトです。<br>
 ラーメン好きな人間が周りに多いため、食べたものを共有したいと思い作成しました。<br>
 twitterと似た感覚で操作できるよう意識して作成しています。<br>
 レスポンシブ対応しているのでスマホからもご確認いただけます。<br>
<kbd><img width="1467" alt="スクリーンショット 2023-04-07 15 14 53" src="https://user-images.githubusercontent.com/110725851/230552613-324aa490-9065-444a-b92b-2fb6afeb4200.png"></kbd>


# URL
https://www.ramen-sns.com/<br>
リンクをクリックするとログイン画面に飛びます。<br>
下記のアカウントをご使用ください。<br>
  ユーザー名：demo1<br>
  パスワード：abcdefgh<br>
（『アカウントをお持ちでない場合は登録してください。』のリンクからアカウントを作成することも可能です。）<br>

# 使用技術
#### frontend
  - node: 18.14.0
  - typescript: 4.9.4
  - react: 18.2.0
  - react-redux: 8.0.5
  - next: 13.1.6
  - styled-components: 5.3.6
  - AWS
    - Amplify
    - Route53
#### backend
  - node: 18.14.0
  - express: 4.18.2
  - jsonwebtoken: 9.0.0
  - MongoDB Atlas: 5.0.15
  - AWS
    - VPC
    - ECS 
    - ECR
    - ALB
    - S3
    - ACM
    - Route53

# 構成図
![構成図](https://user-images.githubusercontent.com/110725851/230565077-fbb0d29e-ebf7-4e41-a8cd-71142a367e50.png)


# 機能一覧
- ユーザー登録、ログイン機能
- フォロー機能
- 投稿機能
  - 画像投稿
  - いいね機能
  - コメント機能
  - ブックマーク機能
- 通知機能
- ランキング表示機能
