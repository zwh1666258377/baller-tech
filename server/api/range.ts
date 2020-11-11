/**
 * @param totalSize 整体字节大小
 */
export const createRange = (totalSize: any, req: any, res: any) => {
  const range = req.headers.range;
  // 判断是否存在range
  if (!range) {
    return { code: 200 };
  }
  const sizes = range.match(/bytes=(\d*)-(\d*)/);
  const end = sizes[2] || totalSize - 1;
  const start = sizes[1] || totalSize - end;
  // 判断需要截取的end start 值是否正确
  if (start > end || start < 0 || end > totalSize) {
    return { code: 200 };
  }
  // 设置头部
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
  res.setHeader('Content-Length', end - start);
  // 可以处理的情况返回以下结果
  return {
    code: 206,
    start: parseInt(start),
    end: parseInt(end),
  };
};
