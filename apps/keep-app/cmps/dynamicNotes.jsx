export function DynamicNote({noteType, handleInputSubmit}) {

    return <p>
    <textarea name="text" id="text" rows="3" placeholder="type your note..." onKeyDown={handleInputSubmit}></textarea>
</p>
}