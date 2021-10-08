<script>
    import { tick } from 'svelte';
    import {lists} from '~/store/list'
    import { autoFocusout } from '~/actions/autoFocusout'

    //make data test
    // lists.add({
    //     title: 'Bright!'
    // })

    let isEditMode = false
    let title = ''
    let textAreaEl
    
    function addList() {
        if (title.trim()){
            lists.add({
                title:title
            })
        }
        offEditMode()
    }
    async function onEditMode(){
        isEditMode = true
        await tick()
        textAreaEl && textAreaEl.focus()
    }
    function offEditMode(){
        isEditMode = false
        title = ''
    }
    
</script>



<div class="create-list">
    {#if isEditMode}
        <div 
          use:autoFocusout={offEditMode} 
          class="edit-mode">
            <textarea
              bind:value={title}
              bind:this={textAreaEl}
              placeholder="Enter a title for this list.."
              on:keypress={(event) => {
                  event.key === 'Enter' && addList()
                //   event.key === 'Escape' && offEditMode() //press에서는 동작이 안됨..
                //   event.key === 'Esc' && offEditMode()
              }}
              on:keydown={(event) => {
                //   event.key === 'Enter' && addList()
                  event.key === 'Escape' && offEditMode() //keydown에서만 esc가 동작
                  event.key === 'Esc' && offEditMode()
              }}
              rows="2"></textarea>
            <div class="actions">
                <div class="btn success" on:click={addList}>
                    Add List
                </div>
                <div class="btn" on:click={offEditMode}>
                    Cancel
                </div>
            </div>    
        </div>

    {:else}
        <div
        class="add-anothre-list"
        on:click={onEditMode}>
         + Add another list
        </div>
    {/if}
</div>

<style lang='scss'>
    // @import "../scss/main.scss";

    .create-list {
        white-space: normal;
        font-size: 16px;
        display: inline-block;
        width: 290px;
        padding: 10px 8px;
        vertical-align: top;
        background: rgba(#ebecf0, 0.6);
        border-radius: 4px;
        margin: 0 4px;
        line-height: 20px;
        cursor: pointer;
        transition: .2s;
        &:hover {
            background: rgba(#ebecf0, 1);
        }
    }
</style>