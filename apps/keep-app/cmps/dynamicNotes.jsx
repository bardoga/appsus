export function DynamicNote({noteType, handleInputSubmit}) {

    return <p>
    <textarea name="text" id="text" rows="2" placeholder="Take a note..." onKeyDown={handleInputSubmit}></textarea>
</p>
}