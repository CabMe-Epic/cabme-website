// utils/breadcrumbs.ts
export const getBreadcrumbs = (path: string) => {
    const pathParts = path.split('/').filter(Boolean);

    const breadcrumbs = pathParts.map((part, index) => {
        const href = '/' + pathParts.slice(0, index + 1).join('/');
        return { href, label: capitalize(part) };
    });

    return [{ href: '/', label: 'Home' }, ...breadcrumbs];
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
