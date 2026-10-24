# Quiz do evento Fire Watch

Site estatico e independente do sistema do drone. Nao usa banco de dados nem dependencias externas.

## Testar

Abra um terminal nesta pasta e rode:

```powershell
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

Teste da logica, se Node.js estiver instalado:

```powershell
node test.js
```

## Publicar e gerar o QR Code

Publique esta pasta como um site estatico. Quando tiver a URL final, gere o QR Code pelo proprio navegador ou por um gerador confiavel e imprima apontando para essa URL.

### Render (Static Site)

- Branch: `main`
- Root Directory: deixe vazio
- Build Command: `echo "No build required"`
- Publish Directory: `.`

## Regras atuais

- Cinco perguntas; quatro acertos liberam a roleta.
- Quem nao atingir a nota pode rever a apresentacao e tentar novamente.
- A roleta pode entregar 1, 2, 3 ou 5 balas, com media de 1,8 bala por classificado.
- Depois do giro, o premio e o codigo ficam salvos no navegador e nao ha novo giro no mesmo perfil.

## Recursos visuais

- Fotografia de operacao com drone: USDA Forest Service / Region 5 Photography, em dominio publico, via Wikimedia Commons.
- Tipografia Barlow Condensed: Google Fonts, licenciada pela SIL Open Font License 1.1 (licenca incluida em `assets/`).

<!-- shortcut: o bloqueio usa localStorage e pode ser contornado com outro navegador ou modo anonimo; adote um backend apenas se o premio deixar de ser simbolico. -->
