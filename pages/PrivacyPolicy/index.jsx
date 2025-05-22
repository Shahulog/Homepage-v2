import { 
    Container, 
    Typography, 
    Box, 
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

export default  function Page() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    プライバシーポリシー
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        1. 個人情報の取り扱いについて
                    </Typography>
                    <Typography variant="body1" paragraph>
                        当サイトでは、お客様の個人情報の保護を最重要事項と考え、適切な収集、利用、管理を行います。
                        個人情報は、以下の目的のために必要な範囲で収集・利用いたします。
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        2. 収集する情報
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="お名前" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="メールアドレス" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="その他、サービス提供に必要な情報" />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        3. 情報の利用目的
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="サービスの提供・運営" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="お問い合わせへの対応" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="サービスの改善・開発" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="重要なお知らせの通知" />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        4. 情報の管理
                    </Typography>
                    <Typography variant="body1" paragraph>
                        当サイトでは、お客様の個人情報を適切に管理し、以下のいずれかに該当する場合を除き、
                        個人情報を第三者に開示いたしません。
                    </Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="お客様の同意がある場合" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="法令に基づき開示することが必要である場合" />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        5. アクセス解析ツールについて
                    </Typography>
                    <Typography variant="body1" paragraph>
                        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
                        このGoogleアナリティクスはデータの収集のためにCookieを使用しています。
                        このデータは匿名で収集されており、個人を特定するものではありません。
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        6. プライバシーポリシーの変更について
                    </Typography>
                    <Typography variant="body1" paragraph>
                        当サイトは、必要に応じて、このプライバシーポリシーの内容を変更することがあります。
                        その場合、変更内容を当サイト上でお知らせいたします。
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        7. お問い合わせ
                    </Typography>
                    <Typography variant="body1" paragraph>
                        本プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。
                    </Typography>
                    <Typography variant="body1">
                        メールアドレス：naretame@gmail.com
                    </Typography>
                </Box>

                <Box sx={{ mt: 4, textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                        制定日：2025年5月21日
                    </Typography>
                </Box>
            </Paper>
        </Container>
    )
}