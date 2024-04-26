# 環境構築資料

### Supabase アカウントの用意

Supabase のアカウント, organization, project の作成を行う。

```bash
cp .env.sample .env
```

これで作成された.env ファイルの key に対応する値を埋めていく。

SUPABASE_URL と SUPABASE_ANON_KEY のどちらも Settings > API の中に書かれてているのでその値を利用すること

### Supabase の設定変更

supabase の設定を触る必要がある。

Authentication > Providers > Email から

- Enable Email provider を True

にしてやる必要がある

また、匿名認証を行うため

Settings > Authentication > Auth Settings > User Signups の

- Allow anonymous sign-ins を true

にしてやる必要がある
