// 这个后端脚本专门帮你的网页去 ModelScope 偷看文件列表
export default async function handler(req, res) {
    const user = 'wflove520';
    const repo = 'my_disk_001';
    
    // ModelScope 的官方 API 接口
    const apiUrl = `https://www.modelscope.cn/api/v1/datasets/${user}/${repo}/repo/tree?Revision=master&Root=`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // 我们只把文件数据返回给前端，过滤掉没用的信息
        if (data.Code === 200) {
            const files = data.Data.Files.map(f => ({
                name: f.Name,
                size: f.Size, // 字节
                date: new Date(f.CommitTime * 1000).toISOString().split('T')[0]
            }));
            res.status(200).json(files);
        } else {
            res.status(500).json({ error: "获取列表失败" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
