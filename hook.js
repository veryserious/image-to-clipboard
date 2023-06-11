export function useCopyImage() {
  const [copied, setCopied] = useState(false);

  const copyImage = useCallback((image) => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, []);

  return [copied, copyImage];
}
