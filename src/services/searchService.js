import data from "../data/knowledgeBase.json"
import { EXACT_MATCH, REACT_KEYWORD_MATCH, NO_MATCH, REACT_KEYWORD_LIST } from "../constant/constant"

function searchService(prompt) {
  const cleanedPrompt = prompt.trim().toLowerCase()

  //Try to find direct match first
  const directMatch = data.faq.find(
    (item) => item.question.toLowerCase() === cleanedPrompt
  )

  if (directMatch) {
    console.log(directMatch.answer)
    return { matchStatus: EXACT_MATCH, prompt:cleanedPrompt, response: directMatch.answer }
  }

  const keywordMatch = REACT_KEYWORD_LIST.some(keyword => cleanedPrompt.includes(keyword))
  if (keywordMatch) {
    return { matchStatus: REACT_KEYWORD_MATCH, response: cleanedPrompt }
  }

  return {matchStatus:NO_MATCH,response: cleanedPrompt}
}

export default searchService
