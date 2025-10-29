<div align="center">
  <img width="212" src="https://github.com/user-attachments/assets/ae74a187-b46c-4643-aec6-8bf5d58baae4" alt="Laxod UI Logo" />
  <h1>Laxod UI</h1>
  <p>A fancy component library for react</p>

</div>

# Installation

```
npm install laxod
```

### Dependency

```
npm install lucide-react
```
<br>

> [!NOTE]
> All components are included in the library.  
> You don't have to install them one by one.  

# Usage

You can import and use Laxod components anywhere in your React project:
```typescript
import { Button } from "laxod";

export default function App() {
  return (
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  );
}
```

You can also import multiple components at once:
```typescript
import {
  Button,
  Dialog,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Select,
  Dropdown,
  Textarea,
  Input,
  useNotification
} from "laxod";
```

<sup>If you want a list of all components and all of their options visit: https://laxod.com/docs/components<sup>


<br>


> [!TIP]
> Our components work on both the server and client side.  
> However, functionality is very limited in server components.  
> We recommend using `"use client"` in Next.js when working with our components.  

Visit https://laxod.com/docs for the full documentation


<br>

(pleaasee contribute!!)

<div align="center">
  <a href="https://laxod.com/">Homepage</a> •
    <a href="https://www.npmjs.com/package/laxod">NPM</a> •
  <a href="https://laxod.com/docs">Documentation</a> •
  <a href="https://discord.gg/2UTkYj26B4">Support</a><br>
  <sub>License: MIT | © 2025 <a href="https://github.com/maximjsx/">Maxim</a></sub>
</div>