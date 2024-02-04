// useTitle composable

export function useTitle(value?: string) {
  if (value) {
    const router = useRouter();
    router.currentRoute.value.meta.title = value;
    useHead({ title: value });
    definePageMeta({ title: value });
    useState<string>("title").value = value;
  }
  return useState<string>("title");
}
