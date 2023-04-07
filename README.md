# ramen-sns
 食べたラーメンを投稿するサイトです。
 ラーメン好きな人間が周りに多いため、食べたものを共有したいと思い作成しました。
 twitterと似た感覚で操作できるよう意識して作成しています。
 レスポンシブ対応しているのでスマホからもご確認いただけます。
<img width="1452" alt="スクリーンショット 2023-04-07 14 55 16" src="https://user-images.githubusercontent.com/110725851/230550406-09f52228-bf5d-4940-862f-3ee7e3251f23.png">


# URL
https://www.ramen-sns.com/
リンクをクリックするとログイン画面に飛びます。
下記のアカウントをご使用ください。（『アカウントをお持ちでない場合は登録してください。』のリンクからアカウントを作成することも可能です。）
  ユーザー名：demo1
  パスワード：abcdefgh

# 使用技術
- frontend
  - node: 18.14.0
  - typescript: 4.9.4
  - react: 18.2.0
  - react-redux: 8.0.5
  - next: 13.1.6
  - styled-components: 5.3.6
  - AWS
    - Amplify
    - Route53
- backend
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

# AWS構成図


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
