【Webフロントエンド開発環境ベース】

<ディレクトリ構成>
root/
　├ dist
　│　└ css/
　│　　　└ index.css(プロジェクトに合わせて随時変更)
　│　　　└ index.min.css(プロジェクトに合わせて随時変更)
　│　└ img/
　│　└ index.html
　│　└ js/
　│　　　└ index.js(プロジェクトに合わせて随時変更)
　├ gulpfile.js
　├ node_modules/
　├ package.json
　│　src/
　│　└ css/
　│　　　└ common.css
　│　　　└ style.css
　│　└ index.html
　│　└ js/
　│　　└ libs/(プロジェクトに合わせて随時追加)
　│　　 　└ jquery-3.1.0.min.js
　└　　└ main.js(プロジェクトに合わせて随時変更)

<gulpタスク>
詳細はgulpfile.jsを参照
