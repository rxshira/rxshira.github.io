# Editing Guide for Your Website

## 📁 Where to Add Images

**Put all your images in the `public/images/` folder:**

- `public/images/hero.jpg` - Your photo for the hero section
- `public/images/avl-trees.jpg` - Image for the AVL Trees research section
- `public/images/specml.jpg` - Image for SpecML project
- `public/images/robograder.jpg` - Image for Robo-Grader project

**How to add images:**
1. Create the `public/images/` folder if it doesn't exist
2. Add your image files (JPG, PNG, etc.)
3. Name them exactly as shown above
4. The website will automatically use them!

## ✏️ Where to Edit Content

### 1. **Edit Projects** → `src/data/projects.ts`

This is where you edit all your projects! Each project has:
- `title` - Project name
- `subtitle` - Short description
- `timeline` - When you worked on it
- `description` - Full description
- `techStack` - Array of technologies
- `links` - GitHub, website, or video links
- `bgColor` - Background color (yellow, magenta, cream, orange)
- `hasImage` - Set to `true` if you have an image
- `imagePath` - Name of your image file (e.g., "specml.jpg")

**Example:**
```typescript
{
  id: 'my-project',
  title: 'My Project',
  subtitle: 'What it does',
  timeline: '2024 - Present',
  description: 'Full description here...',
  techStack: ['React', 'TypeScript'],
  links: {
    github: 'https://github.com/yourusername/project'
  },
  bgColor: 'cream',
  textColor: 'orange',
  hasImage: true,
  imagePath: 'my-project.jpg' // Add this file to public/images/
}
```

### 2. **Edit Hero Section** → `src/components/Hero.tsx`

Change:
- The "Hi, I'm Shira!" text
- Your bio text
- The hero image (add `hero.jpg` to `public/images/`)

### 3. **Edit "What I'm Up To"** → `src/components/CurrentFocus.tsx`

Edit the `activities` array to change what activities are shown.

### 4. **Edit Research Section** → `src/components/Research.tsx`

Update the AVL Trees research description and details.

### 5. **Edit Contact Info** → `src/components/Footer.tsx`

Change your email addresses and contact information.

### 6. **Edit Header** → `src/components/Header.tsx`

Change your name in the header if needed.

## 🎨 How Projects Are Displayed

- **Projects WITH images**: Displayed as full-width sections with image on one side
- **Projects WITHOUT images**: Grouped together in a 2-column grid (side by side)
- **Asteria 1**: Has a special 4-image grid layout

## 🗑️ Removed Unused Components

I've removed these unused components to keep things clean:
- About.tsx
- Awards.tsx
- FutureProjects.tsx
- Volunteering.tsx
- WavyDivider.tsx

## 📝 Quick Tips

1. **To add a new project**: Add it to the `projects` array in `src/data/projects.ts`
2. **To change colors**: Use 'yellow', 'magenta', 'cream', or 'orange' for `bgColor`
3. **To add an image**: Set `hasImage: true` and add `imagePath: 'filename.jpg'`
4. **Projects without images**: Will automatically be grouped together

## 🚀 Running the Website

```bash
npm run dev    # Start development server
npm run build  # Build for production
```

That's it! The main file you'll edit is `src/data/projects.ts` for all your projects.

