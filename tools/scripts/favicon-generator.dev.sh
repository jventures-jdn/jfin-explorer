secrets_file="./configs/envs/.env.secrets"
favicon_folder="./public/favicon/"
master_url="https://cdn.discordapp.com/attachments/1164767344497795207/1169141158010687518/JFIN_Chain-05.png"

if [ ! -f "$secrets_file" ]; then
    echo "Error: File '$secrets_file' not found."
    exit 1
fi

dotenv \
  -v MASTER_URL=$master_url \
  -e $secrets_file \
  -- bash -c 'cd ./deploy/tools/favicon-generator && ./script.sh'

if [ -d "$favicon_folder" ]; then
  rm -r "$favicon_folder"
fi
mkdir -p "$favicon_folder"
cp -r ./deploy/tools/favicon-generator/output/* "$favicon_folder"