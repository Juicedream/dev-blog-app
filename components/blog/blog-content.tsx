export function BlogContent({ content }: { content: string }) {
  return (
    <div
      className="overflow-y-auto scroll-smooth scrollbar-none h-74 border border-blue-500/20 rounded-md px-2 py-2 shadow-xs shadow-black/10 bg-gray-100 text-sm font-semibold text-wrap prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
