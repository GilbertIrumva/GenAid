# Database Design

## User

```ts
{
  _id: ObjectId
  name: string
  email: string
  password: string
  role: "admin" | "editor"
  createdAt: Date
}
```

## Program

```ts
{
  _id: ObjectId
  title: string
  description: string
  image: string
  category: string
  featured: boolean
  createdAt: Date
}
```

## Story

```ts
{
  _id: ObjectId
  title: string
  summary: string
  content: string
  image: string
  author: string
  createdAt: Date
}
```

## Partner

```ts
{
  _id: ObjectId
  name: string
  logo: string
  website: string
  description: string
}
```

## ImpactMetric

```ts
{
  _id: ObjectId
  title: string
  value: number
  icon: string
  order: number
}
```

## ContactMessage

```ts
{
  _id: ObjectId
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}
```