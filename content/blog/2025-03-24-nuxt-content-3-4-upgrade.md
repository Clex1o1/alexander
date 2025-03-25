---
title: Upgrading to Nuxt Content 3.4
date: 2025-03-24T00:00:00.000Z
---

# Upgrading to Nuxt Content 3.4: A Comprehensive Guide

Recently, I upgraded my blog to use Nuxt Content 3.4. This upgrade brought significant changes to how content is handled in Nuxt applications. In this post, I'll share the key changes and how to implement them.

## Major Changes Overview

### 1. Content Querying System

The most significant change is the transition from `queryContent` to a collection-based approach using `queryCollection` and `queryCollectionNavigation`.

```typescript
// Old way
const { data } = await useAsyncData("content", () => queryContent("/blog"));

// New way
const { data } = await useAsyncData("content", () =>
  queryCollection("blog").path("/blog").first()
);
```

### 2. Component Updates

The `ContentDoc` component has been replaced with `ContentRenderer`, requiring changes in how content is displayed:

```vue
<!-- Old -->
<ContentDoc />

<!-- New -->
<ContentRenderer :value="page" v-if="page" />
```

### 3. Navigation Changes

Navigation handling has been updated to use the new collection system:

```typescript
// Old way
const navigation = await queryContent("/blog").navigation();

// New way
const blog = await queryCollectionNavigation("blog");
```

## Implementation Details

### Content Configuration

A new content configuration system has been introduced. Create a `content.config.ts` file:

```typescript
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "**",
      type: "page",
      schema: z.object({
        title: z.string(),
        date: z.string(),
      }),
    }),
  },
});
```

### Error Handling

The upgrade includes improved error handling:

```vue
<NuxtErrorBoundary>
  <template #error="{ error }">
    <ErrorPage :error="error" />
  </template>
  <!-- Your content -->
</NuxtErrorBoundary>
```

### Build Configuration

Updated build configuration in `nuxt.config.ts`:

```typescript
content: {
  build: {
    markdown: {
      highlight: {
        theme: 'github-dark',
      },
    },
  },
}
```

## Dependency Updates

Key package updates required:

```json
{
  "dependencies": {
    "@nuxt/content": "^3.4.0",
    "@nuxt/image": "^1.10.0",
    "@vueuse/nuxt": "^13.0.0"
  }
}
```

## Migration Steps

1. Update your dependencies to the latest versions
2. Create a content configuration file
3. Update all content queries to use the new collection system
4. Replace ContentDoc components with ContentRenderer
5. Update navigation handling
6. Implement new error handling system

## Common Issues and Solutions

### 1. Path Property Changes

The `_path` property has been replaced with `path`:

```typescript
// Old
const path = item._path;

// New
const path = item.path;
```

### 2. Content Rendering

Ensure proper data availability before rendering:

```vue
<ContentRenderer :value="page" v-if="page" />
```

### 3. Navigation Structure

Update navigation queries to use the new collection system:

```typescript
const blog = await queryCollectionNavigation("blog").then((pages) => {
  return pages.find((page) => page.path === "/blog")?.children;
});
```

## Benefits of the Upgrade

1. Better type safety with Zod schema validation
2. Improved error handling
3. More efficient content querying
4. Better organization with collections
5. Enhanced build configuration options

## Conclusion

The upgrade to Nuxt Content 3.4 brings significant improvements to content handling in Nuxt applications. While the migration requires some effort, the benefits in terms of type safety, error handling, and content organization make it worthwhile.

Remember to:

- Test thoroughly after migration
- Update all content queries
- Implement proper error handling
- Update your build configuration
- Check all content rendering components

Happy coding! 🚀
