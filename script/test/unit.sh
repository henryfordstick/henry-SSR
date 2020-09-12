# shellcheck disable=SC2164
cd ./tests/unit
# shellcheck disable=SC2006
# shellcheck disable=SC2010
check_file=`ls  | grep ".spec.ts" |  tr -s "\n"  " "`
echo $check_file
jest --findRelatedTests --passWithNoTests $check_file