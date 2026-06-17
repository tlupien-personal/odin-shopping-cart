mkdir ./src/components/$1
touch ./src/components/$1/$1.jsx
touch ./src/components/$1/$1.module.css
touch ./src/components/$1/index.js
cat >> ./src/components/$1/$1.jsx << EOF
import styles from "./$1.module.css";

export default function $1() {}
EOF
echo "export { default } from \"./$1\";" >> ./src/components/$1/index.js
