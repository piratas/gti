#!/bin/bash
##
## Rotina de backup não eficiente de sites do partidopirata.org
## Rodar somente como root, afim de preservar as permissões e dono/grupo dos arquivos
##
## Para sincronizar localmente os backups no servidor, é necessário ter um usuário incluído no grupo `backup-local`. A partir daí é possível usar o rsync desta forma:
## rsync -avhzPe 'ssh -p 4242' usuario@enwtickler.partidopirata.org:/home/backups/tars/*.gz .
## Substitua o ponto '.' pelo diretório local alvo se necessário.
##
## Para extrair corretamente, é necessário ser root, por exemplo:
## sudo tar -xf backup_partidopirata.org_1478368834.tar.gz
##

##
## Diretório onde backups são armazenados no entwickler
## Permissoẽs:
## drwxr-xr-x 2 root backup-local 4096 Nov  5 19:08 tars
##
BACKUP_BASE_DIR="/home/backups/tars"

##
## Lista de nomes dos sites para usar nos nomes de arquivos tar
## E lista de diretórios absolutos onde se encontram os arquivos para backup
## Aviso: manter consistentes e alinhadas estas duas listas.
## Se isto se tornar tedioso, portar este script para perl ou python.
##
SITES_NOMES=( \
"partidopirata.org" \
"anapirata.partidopirata.org" \
"gtc.partidopirata.xyz" \
"saopaulo.partidopirata.org" \
"mg.movimentopirata.xyz" \
"biblioteca.partidopirata.org" \
"moodle.escolapirata.org" \
"social.pirata.xyz" \
#"naofode.xyz" \
#"nao.usem.xyz" \
#"nfde.xyz" \
)
SITES_CAMINHOS=( \
## partidopirata.org
"/home/wordpress/www" \
## anapirata.partidopirata.org
"/home/wordpress/anapirata" \
## gtc.partidopirata.xyz
"/home/wordpress/gtc" \
## saopaulo.partidopirata.org
"/home/wordpress/saopaulo" \
## mg.movimentopirata.xyz
"/var/www/www/wp/mg.movimentopirata.xyz" \
## biblioteca.partidopirata.org
"/home/biblioteca/mediagoblin" \
## moodle.escolapirata.org
"/home/moodle/moodle.escolapirata.org" \
## social.pirata.xyz
"/var/www/git/social.pirata.xyz/file" \
## naofode.xyz
#"/home/naofode/naofode.xyz" \
## nao.usem.xyz
#"/home/naofode/nao.usem.xyz" \
## nfde.xyz
#"/home/naofode/nfde.xyz" \
)

##
## Daqui pra baixo provavelmente não precisa alterar nada.
## Quem for tentar "melhorar" esta parte, leia antes:
## http://tldp.org/LDP/abs/html/index.html
##
if [ ${#SITES_NOMES[@]} -eq ${#SITES_CAMINHOS[@]} ]
then
        pushd "${BACKUP_BASE_DIR}"
        for SITE in $(seq 0 1 $(expr ${#SITES_NOMES[@]} - 1))
        do
                mkdir "${BACKUP_BASE_DIR}/${SITES_NOMES[SITE]}"
                rsync -avhP "${SITES_CAMINHOS[SITE]}/" "${BACKUP_BASE_DIR}/${SITES_NOMES[SITE]}/"
                tar -cSpzf "${BACKUP_BASE_DIR}/backup_${SITES_NOMES[SITE]}_$(date +%s).tar.gz" "${BACKUP_BASE_DIR}/${SITES_NOMES[SITE]}"
                rm -r "${BACKUP_BASE_DIR}/${SITES_NOMES[SITE]}"
        done
        popd
else
        echo "Leia a documentação do script antes de editá-lo."
fi


