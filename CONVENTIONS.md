## 📁 Project Structure Guidelines

We follow a **domain-driven file naming convention** for clarity and scalability.
👉 Examples:

- `tenant.dashboard.screen.tsx`
- `owner.properties.screen.tsx`
- `shared.map.screen.tsx`
- `tenant.menu.tab.tsx`
- `auth.login.stack.tsx`

👉 Folder structure reflects app domains:

``` typescript
/screens
  ├── tenant/
  ├── owner/
  ├── admin/
  ├── auth/
  ├── shared/
  └── ...
/navigation
  └── stacks, tabs (follows same naming)
```

---

## 📌 Type & Interface Conventions

✅ All types, interfaces, and enums live in the corresponding `store` or `types` folder for the domain.  
✅ No redefining `Tenant`, `Owner`, etc in components — import from the domain’s types.

Example:

```ts
import { Tenant } from "@/stores/tenants/tenants.types";

### 🔑 Redux / RTK Query Conventions
✅ Use RTK Query’s cache as the source of truth for server data.
✅ Redux slices should only manage UI state (e.g. selected item, modal visibility).
✅ No duplication of server data in slices unless justified.

### ⚡ Coding Style
✅ Use TypeScript strict types — no any unless truly necessary (and must be documented).
✅ Prefer const over let where possible.
✅ Prefer functional components with hooks.

