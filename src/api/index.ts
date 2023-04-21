// Replace {CATEGORY_ID}
const BASE_URL = "https://api.cdtrfbgg54-sandvikab1-p1-public.model-t.cc.commerce.ondemand.com/occ/v2/br/products/search?fields=relatedParts(FULL)%2Cfacets%2Cbreadcrumbs%2Cpagination(DEFAULT)%2Csorts(DEFAULT)%2CfreeTextSearch%2CcurrentQuery&query=%3Arelevance%3AallCategories%3A{CATEGORY_ID}&pageSize=300&lang=es&curr=EUR"

export async function getSandvikData() {
    const categoryId = 1
    fetch(BASE_URL.replace("{CATEGORY_ID}", categoryId.toString())).then(r => r.text().then(xml => {
        console.log(xml)
    }))
}

getSandvikData()