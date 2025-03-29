# Jason FileUp

Jason FileUp é um sistema desenvolvido para gerenciar o envio e download de arquivos de apresentação, como PowerPoint, documentos do Word e PDFs. Este projeto permite que os usuários enviem arquivos para um servidor e os armazenem, com a possibilidade de baixá-los na hora da apresentação.

## Funcionalidades

- **Envio de Arquivos**: Os usuários podem enviar arquivos no formato `.pptx`, `.docx` e `.pdf`.
- **Armazenamento**: Arquivos enviados são armazenados no servidor e podem ser acessados posteriormente.
- **Download Instantâneo**: Após o envio, os arquivos ficam disponíveis para download, facilitando a acessibilidade durante apresentações.
- **Validação de Arquivos**: Apenas arquivos com extensões específicas são aceitos (PPTX, DOCX, PDF).
- **Segurança dos Arquivos**: Apenas usuários com o código podem acessar o arquivo.

## Tecnologias Utilizadas

- **Node.js**: Execução no servidor.
- **Express.js**: Para criação de APIs e gerenciamento de rotas.
- **Multer**: Para gerenciamento de uploads de arquivos.
- **React.js**: Frontend para o gerenciamento dos arquivos e interação com o usuário.
- **GitHub**: Versionamento de código e colaboração no desenvolvimento.
