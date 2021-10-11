<script>
    import Sortable from 'sortablejs'
    import { onMount } from 'svelte'
    import { lists } from '~/store/list'
    import List from '~/components/List.svelte'
    import CreateList from '~/components/CreateList.svelte'

    let listsEl
    let sortableLists

    onMount(() => {
      sortableLists = new Sortable(listsEl, {
          group: 'My lists',
          handle: '.list', // 드래그 핸들이 될 요소
          delay: 50,
          animation: 100,
          forceFallback: true,
          onEnd(event) { // 소팅이 끝나면 실행 --> 재정렬이 필요해서 내용에 작성
              console.log(event)
              lists.reorder({
                  oldIndex: event.oldIndex,
                  newIndex: event.newIndex
              })
          }
      })  
    })

</script>

<div class="list-container">
    <div class="lists"
        bind:this={listsEl}>
        {#each $lists as list (list.id)}
            <List sortableLists={sortableLists} list={list} />
        {/each}
    </div>
    <CreateList />
</div>


<style lang="scss">
    .list-container {
        
        width: 100vw;
        height: calc(100vh - 40px);
        // border: 10px solid red;
        padding: 30px;
        box-sizing: border-box;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        font-size: 0;
        // margin-left: 200px;
        // margin-top:50px;
        transition: .2s;
        // perspective-origin: right;
        // transform: perspective(1500px) rotateY(10deg);
        .lists{
            display: inline-block;
            height: 100%;
            // border: 10px solid blue;
            // box-sizing: border-box;
            white-space: nowrap;
            font-size: 0;
        }
    }
</style>