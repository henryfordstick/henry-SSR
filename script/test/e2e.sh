# shellcheck disable=SC2164
cd ./tests/e2e

# shellcheck disable=SC2006
# shellcheck disable=SC2010
check_file=`ls | grep ".spec.ts" |  tr -s "\n"  " "`;
jest --findRelatedTests "$check_file"
